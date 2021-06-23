import React, { useEffect, useState } from 'react';
import call from './service';
import toastDisplay from './toastNotification';
import { Table } from 'react-bootstrap'
import { formatDate_Application, } from './dateFormaters';
import SignPad from "./sign_pad.js";
import './preview.css'
import validate from './main.js';

// import './style.css'

const FilePreview = ({fileData, showPreviewModal, setshowPreviewModal, viewTrail }) => {

  const [data, setData] = useState({});
  const [fileResult, setfileResult] = useState({});
  const [docDetailsDB, setdocDetailsDB] = useState({});
  const [bcInfoForDoc, setbcInfoForDoc] = useState([]);
  const [tab, setTab] = useState(0);
  const [showLoader, setshowLoader] = useState(false);
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const [refresh, setrefresh] = useState(0);

  const astrix = <span className="required-field text-danger">*</span>

  // const userTypeId = userTokenDetails.type_id ? userTokenDetails.type_id : null
  // const userEmail = userTokenDetails.email ? userTokenDetails.email : null
  // const userId = userTokenDetails.user_id ? userTokenDetails.user_id : null
  //---------------------------------------------------------------------------------------------------------------------
  // use effects
  useEffect(() => {
    console.log("fileData in preview file-->", fileData)
    console.log(fileData.tbl_doc_id);

    //setData({ ...data, userId: userId, tblDocId: fileData.tbl_doc_id })
    setData({ ...data, tblDocId: fileData.tbl_doc_id })

    //------------------------------------------------------------------
    //API Calls
    setshowLoader(true)

    const docID = fileData.tbl_doc_id ? fileData.tbl_doc_id : fileData.tbl_doc_detail_id ? fileData.tbl_doc_detail_id : fileData.id ? fileData.id : ""

    if (docID) {

      call('POST', 'userdocdetails/1621', { 'tbldocid': 1621 }).then((result) => {
        console.log("getdocdetails Result-->", result)
        setdocDetailsDB(result)

        call('POST', 'userdochash', { 'fileHash': 'ba48df56abf360af7098d085058079ed' }).then((result2) => {
          console.log("getDoc fileResult-->", result2)
          if (result2) {
            if (fileData.action === "view") {
              setfileResult(result2)
              setshowLoader(false)
            } else if (fileData.action === "download") {
              downloadTheFile(result, result2)
              setshowLoader(false)
            }
          }
        }).catch(err => {
          setshowLoader(false)
          console.log("previewFile error:->", err)
          toastDisplay(err, "error");
        })

      }).catch(err => {
        console.log("getdocdetails error:->", err)
        toastDisplay(err, "error");
      })

      if (fileData.action === "view") {
        call('POST', 'getdigitalsigntrail', { 'tbldocid': docID }).then((result) => {
          console.log("getdigitalsigntrail Result-->", result)
          setbcInfoForDoc(result)
        }).catch(err => {
          console.log("getdigitalsigntrail error:->", err)
          toastDisplay(err, "error");
        })
      }

    } else {
      toastDisplay("Can not Fetch Documents details , ID is Missing", "warn");
      setshowLoader(false)
    }


    //------------------------------------------------------------------

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      handleSubmit();
    } else if (isSubmitting) {
      setIsSubmitting(false)
      toastDisplay("Form Validation Error", "warn")
    }
  }, [error]);
  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
  // Handlers

  function downloadTheFile(result, result2) {
    if (result.file_name.split(".").pop() === "png" || result.file_name.split(".").pop() === "PNG") {
      console.log(result.file_name);
      let link = document.createElement("a");
      console.log(link);
      link.download = result.file_name.split(".")[0] + ".png";
      link.href = 'data:application/png;base64,' + encodeURI(result2.filebase64);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (result.file_name.split(".").pop() === "jpg" || result.file_name.split(".").pop() === "JPG") {
      let link = document.createElement("a");
      link.download = result.file_name.split(".")[0] + ".jpeg";
      link.href = 'data:application/jpeg;base64,' + encodeURI(result2.filebase64);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (result.file_name.split(".").pop() === "pdf" || result.file_name.split(".").pop() === "PDF") {
      let link = document.createElement("a");
      link.download = result.file_name.split(".")[0] + ".PDF";
      link.href = 'data:application/pdf;base64,' + encodeURI(result2.filebase64);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function viewTheFile(result) {
    let mime = docDetailsDB.file_name.split(".").pop()
    let sourceType = getSourceType(mime)
    return (
      <div>
        {
          (mime === "pdf" || mime === "PDF") ?
            <iframe title="Document Preview" frameborder="0" width='100%' height='100%' 
              src={sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")}></iframe>
            :
            <img src={sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")} alt={fileData.file_name} />
        }
      </div>

    )
  }

  function getSourceType(mime) {
    return ((mime === "png" || mime === "PNG") ? "data:image/png;base64," :
      (mime === "jpg" || mime === "JPG") ? "data:image/jpeg;base64," :
        (mime === "pdf" || mime === "PDF") ? "data:application/pdf;base64," : "")
  }

  function openInFullScreen(result) {
    let sourceType = getSourceType(docDetailsDB.file_name.split(".").pop())
    let newWindow = window.open('_blank', 'View Document', 'width=100%,height=100%', 'resizable,scrollbars');
    if (newWindow === null) {
      toastDisplay("Something Went Woring !", "warn");
    }
    //<iframe title="Document Preview" frameborder="0" width='90%' height='100%' src="${sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")}"></iframe>
    //<iframe id="pdfBase64" type="hidden" title="Document Preview" frameborder="0" width='90%' height='100%' src="${sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")}"></iframe>
    else {
      newWindow.moveTo(0, 0);
      newWindow.resizeTo(window.screen.width, window.screen.height);
      newWindow.document.writeln('<head><title>Preview</title></head>');
      newWindow.document.write(`<body>
        ${<SignPad/>}
        <iframe title="Document Preview" frameborder="0" width='90%' height='100%' src="${sourceType + encodeURI(result.filebase64 ? result.filebase64 : "")}"></iframe>

        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        </body>` )
      newWindow.focus();
    }
  }


  function gettrailBody(data) {

    let body = (data && data.length) ? data.map((data, index) => {
      return (
        <tr>
          <td>{data.signer}</td>
          <td>{data.sign}</td>
          <td>{data.bcTxnID}</td>
          <td>{data.ipAddress}</td>
          <td>{data.comment}</td>
          <td>{data.bcTxnID}</td>
        </tr>
      )
    }) : ''
    return body
  }
  const handleChange = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  const preHandleSubmit = (event) => {
    if (event) event.preventDefault();
    setError(validate(values));
    setIsSubmitting(true);
  };
  function handleSubmit(type) {
    setshowLoader(true)

    let signData = new signData();
    // values.userId = userId
    // values.userEmail = userEmail
    Object.keys(values).forEach((key) => {
      signData.append(key, values[key]);
    });

    call('POST', 'signpoaition', signData).then((result) => {
      console.log('post request result:', result);
      toastDisplay(result, "success");
      setshowLoader(false)
      setrefresh(refresh + 1)
    }).catch(err => {
      setshowLoader(false)
      console.log("conn:", err)
      toastDisplay(err, "error");
    })
  }

  return (
    <div>
      {(showPreviewModal && fileData.action === "view") && <div className={"modal" + (showPreviewModal ? " show" : "")} id="docPreview">
        <div className="modal-dialog modal-xl border-inner" id="parent_class">
          <div className="modal-content">
            <div className="modal-header primary">
              <h4 className="modal-title text-white">{(docDetailsDB.mst_doc_name ? docDetailsDB.mst_doc_name : docDetailsDB.doc_name) + " - " + docDetailsDB.file_name}</h4>
              <button type="button" className="close" onClick={() => { setshowPreviewModal(false) }}>×</button>
            </div>
            <div className="modal-body">
              {showLoader && (<div className="loading-overlay"><span><img className="" src="assets/images/loader.gif" alt="description" /></span></div>)}
              <div className="calc-inner-modal col-md-12 m-0 p-0" >

                <ul className="nav nav-tabs-custom btn m-0 p-0" id="myTab" role="tablist">
                  <li>
                    <a className={"nav-link" + (tab === 0 ? " active show" : "")} onClick={() => setTab(0)}>Preview</a>
                  </li>

                  {viewTrail !== false &&
                    <li>
                      <a className={"nav-link" + (tab === 1 ? " active show" : "")} onClick={() => setTab(1)}>View Trail</a>
                    </li>}
                </ul>

                <div className="d-flex m-0 p-0" style={{ "height": "90%" }}>
                  {tab === 0 &&
                    <div className={"tab-pane active show col-md-12"}>
                      {fileResult.filebase64 && viewTheFile(fileResult)}
                    </div>
                  }
                  {tab === 1 &&
                    <div className={"tab-pane active show  col-md-12"}>
                      <div className="col-md-12 mt-0 pt-0 row">

                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.category_name) ? docDetailsDB.category_name : 'NA'}</h3>
                              <p>Document category</p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.document_name) ? docDetailsDB.mst_doc_name : 'NA'}</h3>
                              <p>Type of Document</p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.doc_name) ? docDetailsDB.doc_name : 'NA'}</h3>
                              <p>Document Name</p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.doc_no) ? docDetailsDB.doc_no : 'NA'}</h3>
                              <p>Document No</p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.company_name) ? docDetailsDB.company_name : 'NA'}</h3>
                              <p>Uploaded By</p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-panel col-md-2 text-center">
                          <ul className="text-center">
                            <li>
                              <h3>{(docDetailsDB && docDetailsDB.created_at) ? formatDate_Application(docDetailsDB.created_at) : 'NA'}</h3>
                              {/* <h3>{(docDetailsDB && docDetailsDB.created_at)}</h3> */}
                              <p>Uploaded On</p>
                            </li>
                          </ul>
                        </div>

                      </div>
                      <hr />
                      <div className="col-md-12 mt-0 pt-0 row" style={{ "height": "390px", "overflow": "auto" }}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Signer</th>
                              <th>Signature</th>
                              <th>BC TXN Hash</th>
                              <th>IP Addr.</th>
                              <th>Signer Comment</th>
                              <th>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(bcInfoForDoc && bcInfoForDoc.length) ? gettrailBody(bcInfoForDoc) : ''}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="modal-footer primary">
              <button type="button" className="btn btn-primary btn-sm float-left" onClick={() => openInFullScreen(fileResult)} >View FullScreen</button>
            </div>
            <div>
              <SignPad />
            </div>
            <div>
            <form>
              <label>
                select page number and sign position
                <select className={" form-control" + (!error.country ? '' : ' border-danger')} name="country" value={values.country} onChange={handleChange} >
                  <option value="" selected>Select sign position</option>
                  <option value="top">top left</option>
                  <option value="top">top centre</option>
                  <option value="top">top bottom</option>
                  <option value="mid">mid left</option>
                  <option value="mid">mid centre</option>
                  <option value="mid">mid bottom</option>
                  <option value="bottom">bottom left</option>
                  <option value="bottom">bottom centre</option>
                  <option value="bottom">bottom right</option>
                </select>
              </label>
            </form>
            <div className="form-group col-md-6">
              <label>Page No. {astrix} </label>
              <input type="number" className={" form-control" + (!error.name ? '' : ' border-danger')} placeholder="" name="name" value={values.name} onChange={handleChange} />
              {error.name && <p className="text-danger error-contract">{error.name}</p>}
            </div>
            <button type="button" className="btn-primary btn mt-3 text-center btn-sm" onClick={() => preHandleSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </div>}
    </div>)
}



export default FilePreview
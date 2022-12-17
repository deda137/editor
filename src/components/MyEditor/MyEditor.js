import React, {
  useState,
  //useEffect,
  useRef,
} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

import './MyEditor.css'

import { changeToLetter } from "../../api";

function MyEditor(props) {
  const [data, setData] = useState();
  const [resultData, setResultData] = useState('')
  const [activeTab, setActiveTab] = useState("1");
  const toolBarRef = useRef();

  const editorConfiguration = {
    height: 480,
    toolbar: {
      items: [
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "alignment",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "outdent",
        "indent",
        "|",
        "todoList",
        "link",
        "blockQuote",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
        // "|",
        // "tableCellProperties",
        // "tableProperties",
        // "underline",
        // "strikethrough",
        // "todoList",
      ],
    },
    language: "sr-latn",
    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
  };

//aes 256 encription and decription
  // const key = CryptoJS.enc.Utf8.parse(
  //   "C1D0F8FB4958670DBA40AB1F3752EF0DC1D0F8FB4958670DBA40AB1F3752EF0D"
  // );
  // const iv = CryptoJS.enc.Utf8.parse("00000000000000000000000000000000");

  

  function aesEncrypt(data) {
    const key = CryptoJS.enc.Utf8.parse(
      "C1D0F8FB4958670DBA40AB1F3752EF0DC1D0F8FB4958670DBA40AB1F3752EF0D"
    );
    const iv = CryptoJS.enc.Utf8.parse("00000000000000000000000000000000");
    let cipher = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return cipher.toString();
  }


  function aesDecrypt(data) {
    const key = CryptoJS.enc.Utf8.parse(
      "C1D0F8FB4958670DBA40AB1F3752EF0DC1D0F8FB4958670DBA40AB1F3752EF0D"
    );
    const iv = CryptoJS.enc.Utf8.parse("00000000000000000000000000000000");
    let cipher = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }

  // const encryptedText = aesEncrypt(text);
  // const decryptedText = aesDecrypt(encryptedText);

  // console.log("Before Encrypt - " + text);
  // console.log("Encrypted Text - " + encryptedText);
  // console.log("Decrypted Text - " + decryptedText);


  const handleSubmit = async (letter, data) => {

    const encryptedText = aesEncrypt(data);

    let obj = {
      letter: letter,
      data: encryptedText,
    };
    const result = await changeToLetter(obj);
    console.log(result);
    const decryptedText = aesDecrypt(result);
    setResultData(decryptedText)
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
  };

  



  return (
    <>
      <div style={{}}>
        <Link style={{ float: "right", marginRight: 5 }} to="/login">
          Izloguj se
        </Link>
      </div>

      <div style={{ padding: "50px 10px 10px 10px" }}>
        <div
          style={{
            border: "1px solid lightgray",
            padding: "0px 10px 10px 10px",
            zIndex: 3,
          }}
        >
          <div style={{ marginTop: -39 }}>
            <button
              style={{
                padding: 10,
                border: "1px solid lightgray",
                borderBottom: "0px",
                background: "#fff",
                fontSize: activeTab === "1" ? 16 : 14,
                fontWeight: activeTab === "1" ? "bold" : null,
              }}
              onClick={() => handleSwitchTab("1")}
            >
              Editor
            </button>
            <button
              style={{
                padding: 10,
                border: "1px solid lightgray",
                borderBottom: "0px",
                background: "#fff",
                fontSize: activeTab === "2" ? 16 : 14,
                fontWeight: activeTab === "2" ? "bold" : null,
              }}
              onClick={() => handleSwitchTab("2")}
            >
              Resenje
            </button>
          </div>

          {activeTab === "1" && (
            <>
              {" "}
              <h2>Editor</h2>
              <div ref={toolBarRef} />
              <div
                style={{
                  borderTop: "0px solid lightgray",
                  // borderLeft: "1px solid lightgray",
                  // borderRight: "1px solid lightgray",
                  // borderBottom: "1px solid lightgray",
                  height: 500,
                }}
              >
                <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={data}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // if (toolBarRef.current) {
                    //   toolBarRef.current.appendChild(
                    //     editor.ui.view.toolbar.element
                    //   );
                    // }

                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                  }}
                  // onBlur={(event, editor) => {
                  //   console.log("Blur.", editor);
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log("Focus.", editor);
                  // }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <button onClick={() => console.log(data)}>klik</button>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleSubmit("tocyr", data)}
                >
                  Prebaci u ćirilicu
                </button>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleSubmit("tolat", data)}
                >
                  Prebaci u latinicu
                </button>
              </div>
            </>
          )}

          {activeTab === "2" && (
            <>
              <h2>Resenje</h2>
              <div ref={toolBarRef} />
              <div
                style={{
                  borderTop: "0px solid lightgray",
                //   borderLeft: "1px solid lightgray",
                //   borderRight: "1px solid lightgray",
                //   borderBottom: "1px solid lightgray",
                }}
              >
                <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={resultData}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // if (toolBarRef.current) {
                    //   toolBarRef.current.appendChild(
                    //     editor.ui.view.toolbar.element
                    //   );
                    // }

                    console.log("Editor is ready to use!", editor);
                  }}
                  
                />
              </div>
              {/*<div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <button onClick={() => console.log(data)}>klik</button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => handleSubmit("tocyr", data)}
              >
                Prebaci u ćirilicu
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => handleSubmit("tolat", data)}
              >
                Prebaci u latinicu
              </button>
    </div> */}
            </>
          )}
        </div>
        <button onClick={() => {
          console.log(typeof data)
        }}>klik</button>
        <button onClick={() => {
          console.log(aesEncrypt('marko'))
        }}>test</button>
      </div>
    </>
  );
}

export default MyEditor;

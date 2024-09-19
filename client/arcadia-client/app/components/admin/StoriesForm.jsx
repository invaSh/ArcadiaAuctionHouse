import React from "react";
import dynamic from 'next/dynamic';

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
    ssr: false
  });
const Form = ({ title, values, onChange, onSubmit }) => {

    

  return (
    <div className="flex items-center justify-center mx-auto px-4 w-full">
       <form className="w-full max-w-4xl shadow-md p-5" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={onChange}
              placeholder="Enter the story title"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="summary"
              name="summary"
              type="text"
              value={values.summary}
              onChange={onChange}
              placeholder="Enter a brief summary"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="imageUrl"
            >
              IMAGE URL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={values.imageUrl}
              onChange={onChange}
              placeholder="Enter the URL for the image"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="label"
            >
              Label
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="label"
              name="label"
              type="text"
              value={values.label}
              onChange={onChange}
              placeholder="Enter labels (comma-separated)"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <FroalaEditor
              tag="textarea"
              model={values.content}
              onModelChange={onChange}
              config={{
                placeholderText: "Enter the content of the story",
                charCounterCount: false,
                toolbarButtons: [
                  "fullscreen",
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "subscript",
                  "superscript",
                  "|",
                  "fontFamily",
                  "fontSize",
                  "color",
                  "inlineStyle",
                  "paragraphStyle",
                  "|",
                  "paragraphFormat",
                  "align",
                  "formatOL",
                  "formatUL",
                  "outdent",
                  "indent",
                  "quote",
                  "-",
                  "insertLink",
                  "insertImage",
                  "insertVideo",
                  "embedly",
                  "insertFile",
                  "insertTable",
                  "|",
                  "emoticons",
                  "specialCharacters",
                  "insertHR",
                  "selectAll",
                  "clearFormatting",
                  "|",
                  "print",
                  "spellChecker",
                  "help",
                  "html",
                  "|",
                  "undo",
                  "redo",
                ],
                heightMin: 300, // Set a minimum height for the editor
                heightMax: 200, // Set a maximum height for the editor
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {title === "Edit Story" ? "Update Story" : "Create Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

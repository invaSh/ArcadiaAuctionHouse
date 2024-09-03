import React from 'react';

const Form = ({ title, fields, values, onChange, onSubmit }) => {
  return (
    <form className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
      <h2 className="block text-gray-800 text-xl font-bold mb-6">{title}</h2>

      {fields.map((field) => (
        <div className="mb-6" key={field.name}>
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor={field.name}>
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              className="shadow-sm appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              id={field.name}
              name={field.name}
              value={values[field.name]}  // Correct value binding
              onChange={onChange}         // Correct onChange binding
              rows={field.rows || 5}
              placeholder={field.placeholder}
            ></textarea>
          ) : (
            <input
              className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}  // Correct value binding
              onChange={onChange}         // Correct onChange binding
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}

      <div className="flex items-center justify-center">
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Form;

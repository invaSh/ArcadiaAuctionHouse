import React from "react";

const Form = ({ title, fields, values, onChange, onSubmit }) => {

  const userRole = values.role;

  console.log(userRole);
  

  return (
    <div className="flex items-center justify-center mx-auto px-4">
      <form className="w-full max-w-lg shadow-md p-5" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        {fields.map((field) => (
          <div className="flex flex-wrap -mx-3 mb-6" key={field.name}>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id={field.name}
                    name={field.name}
                    value={values[field.name]}
                    onChange={onChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="User">User</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={onChange}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center mt-4">
          <button
            className="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {title === "Edit User" ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

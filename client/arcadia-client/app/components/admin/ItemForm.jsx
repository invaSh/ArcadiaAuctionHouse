import React from "react";

const ItemForm = ({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  galleryImages = [], // Array of gallery image URLs for edit mode
  galleryInputs = [], // Array to track the number of gallery inputs for create mode
  handleGalleryChange, // Handler for gallery file input change (create mode)
  handleThumbnailChange, // Handler for thumbnail file input change (create mode)
  isEditMode, // Flag to indicate whether it's edit mode
}) => {
  return (
    <form
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      onSubmit={onSubmit}
    >
      <h2 className="block text-gray-800 text-xl font-bold mb-6">{title}</h2>

      {fields.map((field) => (
        <div className="mb-6" key={field.name}>
          <label
            className="block text-gray-600 text-sm font-semibold mb-2"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              className="shadow-sm appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              id={field.name}
              name={field.name}
              value={values[field.name]}
              onChange={onChange}
              rows={field.rows || 5}
              placeholder={field.placeholder}
            />
          ) : field.type === "file" && field.name === "imageUrl" && !isEditMode ? (
            <input
              className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              id={field.name}
              name={field.name}
              type={field.type}
              onChange={handleThumbnailChange} // Only for create mode
            />
          ) : (
            <input
              className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}

      {/* Conditionally render the gallery */}
      {isEditMode ? (
        galleryImages.length > 0 && (
          <div className="my-8">
            <h3 className="text-xl font-bold">Item Gallery</h3>
            <div className="space-y-4">
              {galleryImages.map((imageSrc, index) => (
                <div key={index} className="shadow-sm border border-gray-400 rounded w-48 h-48">
                  <img
                    src={imageSrc}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="my-8">
          <h3 className="text-xl font-bold">Upload Item Gallery</h3>
          <div className="space-y-4">
            {galleryInputs.map((_, index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => handleGalleryChange(index, e)}
                className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditMode ? "Save Changes" : "Create Item"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;

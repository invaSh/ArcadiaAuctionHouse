import React from 'react'

function Button({text}) {
  return (
    <button type="submit" className="px-10 py-5 text-xl text-white hover:bg-zinc-600" style={{ backgroundColor: "rgb(65, 61, 73)" }}>
        {text}
    </button>
  )
}

export default Button

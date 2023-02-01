import * as React from "react"

export const CartIcon = (props) => (
  <svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.12 16.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM14.37 16.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM1.62.75h3l2.01 10.043A1.5 1.5 0 0 0 8.13 12h7.29a1.5 1.5 0 0 0 1.5-1.207l1.2-6.293H5.37" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="var(--color-white)" transform="translate(.87)" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)

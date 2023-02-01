import * as React from "react"

export const HeartGreyIcon = (props) => (
  <svg
    width={23}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path fill="url(#a)" fillOpacity={0.4} d="M.422.505h22.317v20.637H.422z" />
    <defs>
      <pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#b" transform="matrix(.00963 0 0 .01042 .038 0)" />
      </pattern>
      <image
        id="b"
        width={96}
        height={96}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)


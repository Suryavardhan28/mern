import { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="#000000"
        viewBox="0 0 24 24"
        id="dashboard"
        data-name="Flat Color"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-color"
        width="30vw"
        height="30vh"
        {...props}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
            <path
                id="secondary"
                d="M22,4V7a2,2,0,0,1-2,2H15a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h5A2,2,0,0,1,22,4ZM9,15H4a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2H9a2,2,0,0,0,2-2V17A2,2,0,0,0,9,15Z"
                style={{
                    fill: "#e91e63",
                }}
            />
            <path
                id="primary"
                d="M11,4v7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H9A2,2,0,0,1,11,4Zm9,7H15a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V13A2,2,0,0,0,20,11Z"
                style={{
                    fill: "#673ab7",
                }}
            />
        </g>
    </svg>
);
export default Logo;

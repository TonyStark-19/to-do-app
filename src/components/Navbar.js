// import components
import getFormattedDate from "./getFormattedDate.js";

// import icons
import { SlOptions } from "react-icons/sl";

// Navbar Component
export default function Navbar({ toggleOptions, themeColor }) {
    return (
        <div className='navbar'>
            <div
                className='date'
                style={{ color: themeColor }}
            >
                <h2>My Day</h2>
                <p>{getFormattedDate()}</p>
            </div>

            <div className='options'>
                <button
                    className='icon-wrap'
                    onClick={toggleOptions}
                    aria-label="Toggle options menu"
                >
                    <SlOptions
                        className='options-icon'
                        style={{ color: themeColor }}
                    />
                </button>
            </div>
        </div>
    );
}
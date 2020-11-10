import React from 'react';

export const Spinner = () => (
    <svg className="lds-dash-ring" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="rotate(15 50 50)">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;90 50 50" keyTimes="0;1" dur="0.5s" repeatCount="indefinite"></animateTransform>
            <circle cx="50" cy="50" r="30" stroke="#64269e" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="7" transform="rotate(0 50 50)">
                <animate attributeName="stroke" values="#64269e;#442179" keyTimes="0;1" dur="0.5s" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="50" cy="50" r="30" stroke="#442179" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="7" transform="rotate(90 50 50)">
                <animate attributeName="stroke" values="#442179;#241a4f" keyTimes="0;1" dur="0.5s" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="50" cy="50" r="30" stroke="#241a4f" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="7" transform="rotate(180 50 50)">
                <animate attributeName="stroke" values="#241a4f;#181841" keyTimes="0;1" dur="0.5s" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="50" cy="50" r="30" stroke="#181841" fill="none" strokeDasharray="23.561944901923447 188.49555921538757" strokeLinecap="round" strokeWidth="7" transform="rotate(270 50 50)">
                <animate attributeName="stroke" values="#181841;#64269e" keyTimes="0;1" dur="0.5s" repeatCount="indefinite"></animate>
            </circle>
        </g>
    </svg>
)


export const DogIcon = () => (
    <svg data-v-47c00277="" className="svg panelIcon contacts-social-icon" data-v-35d02434="">
        <svg xmlns="http://www.w3.org/2000/svg" id="mail" viewBox="0 0 20 20">
            <path fill="#6221A1" d="M10 0C4.473 0 0 4.473 0 10s4.473 10 10 10c1.942 0 3.844-.57 5.46-1.622.484-.315.59-.98.224-1.426l-.41-.502c-.31-.377-.854-.47-1.266-.206-1.189.762-2.584 1.175-4.008 1.175-4.091 0-7.42-3.328-7.42-7.419 0-4.091 3.329-7.42 7.42-7.42 4.038 0 7.42 2.324 7.42 6.452 0 1.564-.851 3.216-2.346 3.375-.7-.018-.682-.518-.544-1.21l.945-4.884c.116-.597-.342-1.152-.95-1.152h-1.814c-.277 0-.51.208-.541.484v.004c-.593-.722-1.632-.878-2.419-.878-3.007 0-5.557 2.509-5.557 6.107 0 2.633 1.483 4.269 3.87 4.269 1.089 0 2.314-.63 3.024-1.546.384 1.375 1.638 1.375 2.852 1.375 4.391 0 6.06-2.887 6.06-5.944C20 3.534 15.565 0 10 0zm-.874 12.275c-.897 0-1.455-.63-1.455-1.644 0-1.814 1.241-2.932 2.364-2.932.9 0 1.436.614 1.436 1.644 0 1.817-1.366 2.932-2.345 2.932z"></path>
        </svg>
    </svg>
)

export const PlusIcon = () => (
    <svg data-v-202f0e0e="" aria-hidden="true" focusable="false" data-prefix="fas"
        data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        className="icon panelIcon question-header-status svg-inline--fa fa-plus fa-w-14" data-v-35d02434="">
        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            className="">
        </path>
    </svg>
)

export const MinusIcon = () => (
    <svg data-v-202f0e0e="" aria-hidden="true" focusable="false" data-prefix="fas"
        data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        className="icon panelIcon question-header-status svg-inline--fa fa-minus fa-w-14" data-v-35d02434="">
        <path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            className="">
        </path>
    </svg>
)

export const CloseIcon = ({ close }) => (
    <svg data-v-2517ece7="" className="svg modal-close" style={{ width: 14, height: 14 }} onClick={close}>
        <svg xmlns="http://www.w3.org/2000/svg" id="cross" viewBox="0 0 166.59 166.59">
            <rect x="-15.88" y="91.01" width="227.73" height="19" rx="9.5" ry="9.5" transform="translate(-57.06 81.51) rotate(-45)"></rect><rect x="-15.88" y="91.01" width="227.73" height="19" rx="9.5" ry="9.5" transform="translate(81.51 223.66) rotate(-135)"></rect>
        </svg>
    </svg>
)

export const CopyIcon = ({ onClick }) => (
    <svg onClick={onClick} data-v-6996fed6="" aria-hidden="true" focusable="false" data-prefix="fas"
    data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
    className="icon icon svg-inline--fa fa-copy fa-w-14" data-v-4cd58869="" style={{ marginLeft: 10, marginRight: 10 }}>
            <path fill="#afb1bb" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
            className="">
            </path>
    </svg>
)

export const EditIcon = ({ onClick }) => (
    <svg onClick={onClick} data-v-6a51481e="" aria-hidden="true" focusable="false" data-prefix="fas"
        data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
        className="icon panelIcon icon svg-inline--fa fa-edit fa-w-18" data-v-4cd58869="">
        <path fill="#afb1bb" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
            className="">
        </path>
    </svg>
)

export const DeleteIcon = ({ onClick }) => (
    <svg onClick={onClick} data-v-6a51481e="" aria-hidden="true" focusable="false" data-prefix="fas"
        data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
        className="icon panelIcon icon svg-inline--fa fa-trash-alt fa-w-14 hover" data-v-4cd58869="">
        <path fill="#afb1bb" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
            className="">
        </path>
    </svg>
)

export const ThreePointsIcon = () => (
    <svg className="vm-icon">
        <svg xmlns="http://www.w3.org/2000/svg" id="dots" viewBox="0 0 16 108" fill='white'>
            <circle className="cls-1" cx="8" cy="8" r="8"></circle><circle className="cls-1" cx="8" cy="100" r="8"></circle><circle className="cls-1" cx="8" cy="53.94" r="8"></circle>
        </svg>
    </svg>
)
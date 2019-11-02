import chroma from 'chroma-js';
import sizes from './sizes';

export default {
    colorBox:{
        width: '20%',
        height: props=>props.showFullPalette?'25%': '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        "&:hover button":{
            opacity: '1',
            transition: '0.4s'
        },
    [sizes.down("lg")]:{
            width: '25%',
            height: props=>props.showFullPalette?'20%': '33.333%',
        },
    [sizes.down("md")]:{
            width: '50%',
            height: props=>props.showFullPalette?'10%': '20%',
        },
    [sizes.down("xs")]:{
        width: '100%',
        height: props=>props.showFullPalette?'5%': '10%',
    },
    },


    copyText:{
        color: props=>chroma(props.background).luminance() >= 0.7 ? 'black': 'white'
    },
    colorName:{
        color:props=>chroma(props.background).luminance()<= 0.08 ? 'white': 'black'
    },
    seeMore:{
        color: props=>chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)': 'white',
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute' ,
        border: 'none',
        right:'0px',
        bottom: '0px',
        width: '60px',
        height: '30px',
        textAlign:'center',
        lineHeight: '30px',
        textTransform: 'uppercase',

    },
    copyButton:{
        color:props=>chroma(props.background).luminance()<= 0.08 ? 'white': 'black',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        margin: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: '0',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
        opacity: 0,
    },
    boxContent:{
        position: 'absolute',
        width:'100%',
        left: '0px',
        padding: '10px',
        bottom:'0px',
        color: 'black',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '12px',
    },
    copyOverlay:{
        opacity: '0',
        zIndex:'0',
        height: '100%',
        width:'100%',
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)',
    },
    showOverlay:{
        opacity: '1',
        transform: 'scale(50)',
        zIndex: '10',
        position: 'absolute'
    },
    copyMsg:{
        position:'fixed',
        left:'0',
        right:'0',
        top:'0',
        bottom:'0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        opacity: '0',
        color: 'white',
        textTransform: 'uppercase',
        flexDirection: 'column',
        "& h1":{
            fontWeight: '400',
            textShadow: '1px 2px black',
            background: 'rgba(255, 255, 255, 0.2)',
            width: '100%',
            textAlign: 'center',
            marginBottom: '0',
            padding: '1rem',
            [sizes.down("xs")]:{
                fontSize: '5rem',
            },
        },
        "& p": {
        fontWeight: '100',
        fontSize: '2rem',
        }
    },
    showCopyMsg:{
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.3s'
    }
    };
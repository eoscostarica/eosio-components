//#region imports
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
//#endregion

//#region global declarations
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

let fileReader;
const useStyles = makeStyles(() => ({
	dialog: {
		maxWidth: '660px',
		margin: 'auto'
	},
	dropzoneBox: {
		maxWidth: '620px',
		cursor: 'pointer',
		backgroundColor: 'lightgray',
		display: 'flex',
		border: 'dashed 2px #212121',
		borderRadius: '2px',
		flexDirection: 'column',
		alignContent: 'center',
		'&': {
			textAlign: 'center'
		}
	}
}));
//#endregion

const DropzoneHash = () => {
	const classes = useStyles();
	const [ open, setOpen ] = useState(false);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((f) => {
			fileReader = new FileReader();
			fileReader.onloadend = (e) => {
				handleInputHashCreator(e.target.result);
			};
			fileReader.readAsBinaryString(f);
		});
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleInputHashCreator = (value) => {
		const result = sha256(value);

		value.length ? setHash(sha256(result)) : setHash(null);
		console.log(result);
		//handleFiles(result);
	};

	const handleClose = () => {
		setOpen(false);
  };
  
  return ();
};

import React from 'react';
import {withStyles} from '@material-ui/styles';
import {SortableElement} from 'react-sortable-hoc';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styles from './styles/DraggableColorBoxStyles'

const DraggableColorBox = SortableElement((props)=> {
const {classes, handleClick, name, color}=props;
    return (
    
        <div style={{backgroundColor: color}} className={classes.root}>
            <div className={classes.boxContent}>
            <span>{name}</span>
            <DeleteOutlinedIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    )
})
export default withStyles(styles)(DraggableColorBox);



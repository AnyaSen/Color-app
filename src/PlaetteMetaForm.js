import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'


export default class PlaetteMetaForm extends Component {
      constructor(props){
        super(props);
        this.state={
          open: true,
          newPaletteName: '',
          stage: 'form'
        };
        this.handleChange=this.handleChange.bind(this);
        this.showEmojiPicker=this.showEmojiPicker.bind(this);
        this.savePalette=this.savePalette.bind(this)
    }
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
        this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()));
      };
      handleChange =(evt)=> {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }
      showEmojiPicker(){
        this.setState({
            stage: 'emoji'
        })
      }
      savePalette(emoji){
        const newPalette= {paletteName: this.state.newPaletteName, 
            emoji: emoji.native};
        this.props.handleSubmit(newPalette)
        this.setState({
          stage: ''
      })
      }
      render() {
        const {newPaletteName} =this.state;
        const {hideForm} = this.props
        return (
            <div>
            <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
            <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
            <Picker onSelect={this.savePalette} title='Pick a Palette Emoji'/>
            </Dialog>
            <Dialog
              open={this.state.stage === 'form'}
              aria-labelledby="form-dialog-title"
              onClose={hideForm}
            >
              <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
              <ValidatorForm onSubmit={this.showEmojiPicker}>
              <DialogContent>
                <DialogContentText>
                  Please, enter the Name of your wonderful Palette! <br/>Remember, it should be unique.
                </DialogContentText>
               
           
            <TextValidator 
            label='New Palette Name' 
            fullWidth
            margin='normal'
            value={newPaletteName}
            onChange={this.handleChange}
            name='newPaletteName'
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={['Give a Name to Your Palette', 'The Name Must Be Unique']}
            />
              </DialogContent>
              <DialogActions>
                <Button onClick={hideForm} color="primary">
                  Cancel
                </Button>
            <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
              </DialogActions>
              </ValidatorForm>
            </Dialog>
            </div>
        );
      }
}

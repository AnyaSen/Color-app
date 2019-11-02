import React, {Component} from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core/';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state={
            curColor: 'pink',
            newColorName: "",
        };
        this.updateColor=this.updateColor.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
          this.props.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
          this.props.colors.every(({ color }) => color !== this.state.currentColor)
        );
      }
    updateColor = (newColor) => {
        this.setState({curColor:newColor.hex})
      };
      handleChange =(evt)=> {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }
      handleSubmit(){
          const newColor={
              color:this.state.curColor,
              name:this.state.newColorName
          };
          this.props.createColor(newColor);
          this.setState({
              newColorName: ''
          });
      }
    render() {
        const {fullPalette, classes}=this.props;
        const{newColorName, curColor}=this.state
        return (
            <div>
                <ChromePicker 
                color={curColor} 
                onChangeComplete={this.updateColor}
                className={classes.picker}/>
          <ValidatorForm 
          onSubmit={this.handleSubmit}
          ref='form'
          instantValidate={false} >
                <TextValidator
                className={classes.colorNameInput}
                variant= 'filled'
                margin='normal'
                placeholder='Color Name'
                    value={newColorName}
                    name='newColorName'
                    onChange={this.handleChange}
                    validators={["required", 
                    //"isColorNameUnique", 
                    //"isColorUnique"
                ]}
                    errorMessages={[
                      "Enter a color name",
                    //"Color name must be unique",
                    //   "Color already used!"
                    ]}
                />
                <Button 
                className={classes.createColor}
                variant="contained" 
                color="primary" 
                style={{backgroundColor: fullPalette ? 'grey': curColor}}
                type='submit'
                disabled={fullPalette}>
                  {fullPalette ? 'Palette Is Full': 'Add New Color'}
              </Button>    
          </ValidatorForm>
                
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);
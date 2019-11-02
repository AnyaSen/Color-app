import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core/';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors'

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props){
    super(props);
    this.state={
      open: true,
      colors: seedColors[0].colors,
      newPaletteName: 'No Name'
    };

   
    this.createColor=this.createColor.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.removeColor=this.removeColor.bind(this);
    this.clearPalette=this.clearPalette.bind(this);
    this.getRandom=this.getRandom.bind(this)
  }



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };



  createColor=(newColor)=>{
    this.setState({colors:[...this.state.colors, newColor]})
  };
  handleChange =(evt)=> {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

handleSubmit(newPalette){
  newPalette.id=newPalette.paletteName.toLowerCase().replace(/ /g, "-");
  newPalette.colors = this.state.colors
  this.props.savePalette(newPalette)
  this.props.history.push('/');
}
removeColor(colorName){
  this.setState({colors: this.state.colors.filter(color=>color.name !== colorName)})
}
onSortEnd = ({oldIndex, newIndex}) => {
  this.setState(({colors}) => ({
    colors: arrayMove(colors, oldIndex, newIndex),
  }));
};

clearPalette(){
  this.setState({colors:[]})
}
getRandom(){
  const allColors=this.props.palettes.map(p=>p.colors).flat();
  let rand ;
  let randColor;
  let isDuplicateColor=true;
  while(isDuplicateColor){
    rand =Math.floor(Math.random()*allColors.length);
    randColor=allColors[rand];
    isDuplicateColor = this.state.colors.some(c=>c.name === randColor.name)
  }
  this.setState({colors:[...this.state.colors, randColor]})
}

  render() {
    const { classes, theme, maxColors, palettes, colors} = this.props;
    const { open } = this.state;
    const fullPalette = this.state.colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav 
        open= {open} 
        palettes={palettes} 
        handleSubmit={this.handleSubmit}
        handleDrawerOpen={this.handleDrawerOpen}/>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
          paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          
          <Divider />
          <div className={classes.container}>
          <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={this.clearPalette}
          className={classes.button}>Clear Palette</Button>
          <Button variant="contained" color="secondary"onClick={this.getRandom} disabled={fullPalette}
          className={classes.button}>Random color</Button>
          </div>
          
          <ColorPickerForm fullPalette={fullPalette} createColor={this.createColor} colors={colors}/>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader}/>
          
        
        <DraggableColorList colors={this.state.colors} 
        removeColor={this.removeColor}
        axis="xy"
        onSortEnd={this.onSortEnd}
        distance={20}/>
       
        </main>
      </div>
    );
  }
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
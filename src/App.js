import React from 'react'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: ['One',
        'Two',
        'Three',
        'Four',],
      selectedData: [],
      tempData: [],
      removeData: [],
      selectedIndex: '',
      temp: ''

    }
  }
  componentWillMount() {
    this.setState({ data: this.state.list })
  }


  handleChange = (e) => {
    const { selectedOptions } = e.target
    let value = Array.from(selectedOptions, option => option.value)
    this.setState({ tempData: value })
  }
  handleSecondList = (e) => {
    const { selectedOptions } = e.target
    let selectedIndex = e.target.selectedIndex;
    let value = Array.from(selectedOptions, option => option.value);
    this.setState({ removeData: value, selectedIndex: selectedIndex })
  }

  getSelectedOptions = () => {
    const { data, tempData, selectedData } = this.state;
    let a = data.filter((val) => {
      if (!tempData.includes(val))
        return val;
    })

    this.setState({
      selectedData: [...selectedData, ...tempData],
      data: a,
      // removeData: [],
      tempData: []
    })
  }
  getSecondListSelectedOptions = () => {
    const { data, selectedData, removeData } = this.state;
    removeData.map((item, i) => {
      data.push(item);
    })

    let a = selectedData.filter((val) => {
      if (!removeData.includes(val))
        return val;
    })

    this.setState({
      selectedData: a,
      data,
      removeData: [],
      tempData: [],
    })
  }

  handleDown = () => {
    let { selectedData, selectedIndex } = this.state;;
    if (-1 === selectedIndex) {
      alert("Please select an option to move.");
      return;
    }
    if (selectedIndex === selectedData.length - 1) {
      let temp = selectedData[selectedIndex];
      selectedData[selectedIndex] = selectedData[0]
      selectedData[0] = temp;
      this.setState({ selectedData: selectedData, removeData: [] })
    } else {
      let temp1 = selectedData[selectedIndex];
      selectedData[selectedIndex] = selectedData[selectedIndex + 1]
      selectedData[selectedIndex + 1] = temp1;
      this.setState({ selectedData: selectedData })
    }
  }

  handleUp = () => {
    let { selectedData, selectedIndex } = this.state;
    if (-1 === selectedIndex) {
      alert("Please select an option to move.");
      return;
    }
    if (selectedIndex === 0) {
      let temp = selectedData[selectedIndex];
      selectedData[0] = selectedData[selectedData.length - 1]
      selectedData[selectedData.length - 1] = temp;
      this.setState({ selectedData: selectedData, removeData: [] })
    } else {
      var temp1 = selectedData[selectedIndex];
      selectedData[selectedIndex] = selectedData[selectedIndex - 1]
      selectedData[selectedIndex - 1] = temp1;
      this.setState({ selectedData: selectedData})
    }
    
  }

  render() {
    return (<><select name="data" size="10" multiple onChange={this.handleChange}>
      {
        this.state.list.map((item, i) => {
          if (this.state.data.includes(item)) { return <option value={item} key={i}>{item}</option> }
        })
      }
    </select>
      <button onClick={this.getSelectedOptions} >  >  </button>
      <button onClick={this.getSecondListSelectedOptions} >  {"<"}  </button>
      <select name="selected" size="10" id="selected" onChange={this.handleSecondList} multiple>
        {
          this.state.selectedData.map((item, i) => (
            <option value={item}>{item}</option>
          ))
        }
      </select>
      <button onClick={this.handleDown}>Move Down</button>

      <button onClick={this.handleUp}>Move Up</button>
    </>)
  }

}
export default App;
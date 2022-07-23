import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { 
  Box, 
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };

    this.myRef = React.createRef();
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    let filteredSuggestions;
    if (userInput.length > 1) {
        // Filter our suggestions that don't contain the user's input
        filteredSuggestions = suggestions.filter(
          suggestion => {
            return suggestion["term"].toLowerCase().indexOf(userInput.toLowerCase()) > -1
          }
        );
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });

    this.props.onSelect(e.currentTarget.id);
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]["term"]
      });
      this.props.onSelect(filteredSuggestions[activeSuggestion]["uid"]);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput.length > 1) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <PopoverContent name="dest_suggestions" maxW="300">
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion["uid"]} id={suggestion["uid"]} onClick={onClick}>
                    {suggestion["term"]}
                  </li>
                );
              })}
            </ul>
          </PopoverContent>
        );
      } else {
        suggestionsListComponent = (
          <PopoverContent name="dest_suggestions">
            <div className="no-suggestions">
              <em>No matches found.</em>
            </div>
          </PopoverContent>
        );
      }
    }
    
    return (
      <Box>
        <Popover initialFocusRef={this.myRef} isOpen={this.props.open} returnFocusOnClose={false}>
          <PopoverTrigger>
            <Input
              name="dest_input"
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={(e) => this.props.onFocus(true)}
              value={userInput}
              ref = {this.myRef}
            />
          </PopoverTrigger>
          {suggestionsListComponent}
        </Popover>
      </Box>
    );
  }
}

export default Autocomplete;

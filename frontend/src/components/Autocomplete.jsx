import React, { useRef } from "react";
import { 
  Box, 
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";

function Autocomplete(props) {
  const myRef = useRef();
  let suggestionsListComponent;

  if (props.showSuggestions && props.userInput.length > 1) {
    if (props.filteredSuggestions.length) {
      suggestionsListComponent = (
        <PopoverContent name="dest_suggestions" maxW="300">
          <ul className="suggestions">
            {props.filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === props.activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion["uid"]} id={suggestion["uid"]} onClick={props.onClick}>
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
      <Popover initialFocusRef={myRef} isOpen={props.open} returnFocusOnClose={false}>
        <PopoverTrigger>
          <FormControl isInvalid={props.invalidDestination}>
            <Input
              name="dest_input"
              type="text"
              onChange={props.onChange}
              onKeyDown={props.onKeyDown}
              onFocus={(e) => props.onFocus(true)}
              onClick={e => props.setInvalidDestination(false)}
              value={props.userInput}
              ref = {myRef}
            />
            {props.invalidDestination && <FormErrorMessage>Please fill in a destination.</FormErrorMessage>}
          </FormControl>
        </PopoverTrigger>
        {suggestionsListComponent}
      </Popover>
    </Box>
  );
}


export default Autocomplete;

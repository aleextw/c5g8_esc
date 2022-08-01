import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export const CustomLeftNav = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
        type="button"
        className="image-gallery-icon image-gallery-left-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Previous Image"
    >
        
        <ArrowLeftIcon w="6" h="6"/>
    </button>
  );
});

CustomLeftNav.displayName = 'CustomLeftNav';

export const CustomRightNav = React.memo(({
disabled,
onClick,
}) => {
return (
    <button
        type="button"
        className="image-gallery-icon image-gallery-right-nav"
        disabled={disabled}
        onClick={onClick}
        aria-label="Next Image"
    >
        <ArrowRightIcon w="6" h="6"/>
    </button>
);
});
  
CustomRightNav.displayName = 'CustomRightNav';
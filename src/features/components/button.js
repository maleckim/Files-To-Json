import React from 'react';
import Button from '@material-ui/core/Button';

export default function ButtonComponent(props) {
  const { text } = props;
  const disabled = props.disabled || false;

  return disabled ? (
    <></>
  ) : (
    <div id="container">
      <Button
        classes={{ label: 'main-buttons' }}
        onClick={() =>
          props.onClick ? props.onClick() : console.log('no prop')
        }
        variant="contained"
      >
        {text}
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { InputGroup, FormControl } from 'react-bootstrap';

export default function LoginOverlay(props) {
  const [input, updateInput] = useState('');
  const { title, userSearch, exists, onHide } = props;
  useEffect(() => {
    exists.length ? onHide() : console.log('trub');
  }, [exists]);

  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="folderCreation">
          <InputGroup className="mb-3">
            <FormControl
              custom="true"
              style={{
                backgroundColor: 'white',
                width: '50%',
                margin: '0 auto',
                border: 'solid grey 1px',
              }}
              onChange={(e) => updateInput(e.target.value)}
              placeholder="user"
              aria-label="user"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button
                onClick={() => {
                  userSearch(input);
                }}
                type="submit"
                variant="outline-secondary"
              >
                Find
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Modal.Body>
    </Modal>
  );
}

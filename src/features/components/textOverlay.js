import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { InputGroup, FormControl } from 'react-bootstrap';

export default function TextOverlay(props) {
  const [input, updateInput] = useState('');
  const { addNew } = props;

  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new Folder for Library Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="folderCreation">
          <InputGroup className="mb-3">
            <FormControl
              disabled="false"
              custom="true"
              style={{ backgroundColor: 'black' }}
              onChange={(e) => updateInput(e.target.value)}
              placeholder="Example-Company"
              aria-label="Example-Company"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button
                onClick={() => {
                  addNew(`${input}/`);
                  props.onHide();
                }}
                type="submit"
                variant="outline-secondary"
              >
                Create
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Modal.Body>
    </Modal>
  );
}

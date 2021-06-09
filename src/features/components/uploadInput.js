import React, { useEffect, useState } from 'react';
import { Ring } from 'react-awesome-spinners';
import ButtonComponent from './button';
import styles from '../fetch/Fetch.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UploadInput(props) {
  const [input, updateInput] = useState([]);
  const [loading, updateStatus] = useState(!props.loading);

  useEffect(() => {
    updateStatus(!loading);
    updateInput([]);
  }, [props.loading]);

  return (
    <div className={styles.selectSbs}>
      <label htmlFor="formFileMultiple" className="form-label">
        <input
          onChange={(e) => updateInput(e.target.files)}
          style={{ display: 'none' }}
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
        />
        {input.length > 0 ? `${input.length} files selected` : 'Select Files'}
      </label>

      <ButtonComponent
        loading={loading}
        onClick={() => {
          props.uploadFiles(input);
          updateStatus(true);
        }}
        text={
          loading ? (
            <Ring className="test" style={{ height: '25px' }} />
          ) : (
            'Upload'
          )
        }
        className="btn btn-outline-secondary"
      />
    </div>
  );
}

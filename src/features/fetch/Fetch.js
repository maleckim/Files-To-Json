import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { download, sliceBucket } from '../../utils/download';
import Dropdown from 'react-dropdown';
import UploadInput from '../components/uploadInput';
import Button from '../components/button';
import TextOverlay from '../components/textOverlay';
import CodeEditor from '../components/editor';

import 'react-dropdown/style.css';
import {
  viewRes,
  currentFolder,
  successfulUpload,
  finalizedThumbs,
  thumbURLs,
  jsonFromDir,
} from './fetchSlice';
import * as All from './fetchSlice';
import styles from './Fetch.module.css';

export const Fetcher = () => {
  const {
    createPreviews,
    getPreviews,
    addNewFolder,
    setCurrentFolder,
    uploadToFolder,
    getBucketFolder,
    persistData,
    getData,
    jsonFromDir,
  } = All;

  const value = useSelector(viewRes);
  const folder = useSelector(currentFolder);
  const successUp = useSelector(successfulUpload);
  const thumbLinks = useSelector(thumbURLs);
  const finalThumbs = useSelector(finalizedThumbs);
  const importedJson = useSelector(jsonFromDir);
  const dispatch = useDispatch();

  const [json, updateJson] = useState([]);
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    updateJson(importedJson);
  }, [importedJson]);

  useEffect(() => {
    if (json.length) {
      const payload = { folder, json };
      dispatch(persistData(payload));
    }
  }, [folder, json]);

  useEffect(() => {
    dispatch(getBucketFolder('GET'));
    if (successUp.length > 0) {
      dispatch(createPreviews(successUp));
    }
  }, [successUp]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (thumbLinks.length > 0) {
      dispatch(getPreviews(thumbLinks));
    }
  }, [thumbLinks]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (finalThumbs.length > 0) {
      let tempJson = [];
      for (let i = 0; i < finalThumbs.length; i++) {
        const finalJson = {
          title: successUp[i],
          description: '',
          file: successUp[i],
          thumb: finalThumbs[i],
        };
        tempJson = [...tempJson, finalJson];
      }
      updateJson(tempJson);
    }
    updateLoad(!load);
  }, [finalThumbs]); // eslint-disable-line react-hooks/exhaustive-deps

  const [modalShow, setModalShow] = useState(false);
  const options = value.map((a) => a);

  const addNew = (input) => {
    const baseURL = 'lib-tool/Projects/';
    dispatch(addNewFolder(input));
    dispatch(setCurrentFolder(baseURL + input));
  };

  function uploadFiles(files) {
    const cwd = folder;
    const payload = { stream: files, workingDir: cwd };
    dispatch(uploadToFolder(payload));
  }

  function populateImport(jsonData) {
    const cwd = folder;
    dispatch(getData(cwd));
  }

  const Only = (props) => !!props.when && props.children;

  function RenderButton(props) {
    let loadBool = props.loading;
    console.log(loadBool);

    return (
      <Only when={loadBool}>
        <Button text="Export" onClick={() => download(json)} />
      </Only>
    );
  }

  return (
    <div className={styles.dropdownContainer}>
      <a href={json} download style={{ display: 'none' }} />
      <h1 className={styles.pathHeader}>{folder}</h1>
      <TextOverlay
        addNew={addNew}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={styles.selectSbs}>
        <Dropdown
          className={styles.topDrop}
          placeholder="Select Working Directory"
          options={options}
          value={folder}
          onChange={(e) => dispatch(setCurrentFolder(e.value))}
        />
        <Button
          className="Standard spaceMarginSmall"
          text="New Folder"
          onClick={() => setModalShow(true)}
        />
      </div>
      <UploadInput loading={load} uploadFiles={uploadFiles} />
      <CodeEditor value={json} />
      <RenderButton loading={json.length > 1} />
      <Button
        text="Import"
        disabled={importedJson.length > 1}
        onClick={() => populateImport(folder)}
      />
    </div>
  );
};

// import { DeleteOutlined } from '@ant-design/icons';

// import FormData from 'form-data';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { CameraIcon } from '../../../../public/svg';
// import { ratingImageArray } from '../../../../redux/productSlice';
import styles from './index.module.css';
const SingleFileUpload = props => {
  console.error('This is the Upload Image Props -----> ', props);

  const filesize = 5000000;

  const [file, setFile] = useState([]);

  let imgArr = [];
  const handleFile = event => {
    for (let i in event.target.files) {
      if (i < 5) {
        const file = event.target.files[i];
        const obj = {
          fileUrl: URL.createObjectURL(file),
          type: file.type,
          size: file.size,
        };

        imgArr.push(obj);
      }
    }

    setFile(preSate => [...imgArr, ...preSate].slice(0, 5));
  };
  // const formData = new FormData();
  // const imageArr = file.map(image => {
  //   formData.append('file', JSON.stringify(image));
  // });
  // console.log(imageArr);

  const remove = index => {
    const newArr = file.filter((img, i) => i !== index);
    setFile(newArr);
  };

  return (
    <>
      {file.length < 5 ? (
        <div className={styles.customInput}>
          <label>
            <input
              type="file"
              onChange={e => handleFile(e)}
              className="d-none"
              accept="image/png, image/jpeg ,video/mp4"
              multiple
              name="image"
            />

            <CameraIcon />
          </label>
        </div>
      ) : null}
      <div
        style={{ marginLeft: '50px', flexWrap: 'wrap' }}
        className="d-flex  "
      >
        {file.map((file, i) => (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                padding: '10px',
              }}
            >
              <div>
                {file.type === 'video/mp4' ? (
                  <>
                    <video
                      width="120"
                      height="120"
                      controls="controls"
                      autoPlay="true"
                      src={file.fileUrl}
                    />

                    <span
                      style={{
                        padding: '3px',
                        cursor: 'pointer',
                        position: 'absolute',
                      }}
                      onClick={() => remove(i)}
                    >
                      x
                    </span>
                    {file.size > filesize ? (
                      <div className={`text-danger ${styles.error}`}>
                        Cannot insert file greater than 5 Mb
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <img
                      src={file.fileUrl}
                      style={{
                        height: 80,
                        width: 100,
                        objectFit: 'contain',
                        padding: '8px',
                      }}
                      className="mt-2"
                    />
                    <span
                      style={{
                        padding: '3px',
                        cursor: 'pointer',
                        position: 'absolute',
                      }}
                      onClick={() => remove(i)}
                    >
                      x
                    </span>
                    {file.size > filesize ? (
                      <div className={`text-danger ${styles.error}`}>
                        Cannot insert file greater than 5 Mb
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default SingleFileUpload;

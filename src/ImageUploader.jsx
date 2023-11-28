import React, { useState } from 'react'
import "./ImageUploader.css";
import ImageLogo from "./Image.jpg";
import storage from './Firebase';
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const ImageUploader = () => {
    const [loading, setLoading] = useState(false);
    const [isUploaded, setUploaded] = useState(false);


    const OnFileUpLoadToFirebase = (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, "image/" + file.name);
        // console.log(e.target.files[0].name);
        // console.log(storageRef);
        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });
        const uploadImage = uploadBytesResumable(storageRef, file);
        uploadImage.on("state_changed",
            (snapshot) => {
                setLoading(true); //アップロード中
            },
            (Error) => {
                console.log(Error);
            },
            () => {
                setLoading(false); //初期値の戻る
                setUploaded(true);//アップデート完了
            }
        );
    };
    return (
        <div>
            {loading ? (//true
                <h2 className='uploadFont'>アップロード中・・・</h2>
            ) : (//アップロードが終わり
                <div>
                    {isUploaded ? (
                        <h2 className='uploadFont'>アップロード完了</h2>
                    ) : (
                        <div className="outerBox">
                            <div className="title">
                                <h2>画像アップローダー</h2>
                                <p>JpegかPngの画像ファイル</p>
                            </div>
                            <div className="imageUplodeBox">
                                <div className="imageLogoAndText">
                                    <img src={ImageLogo} alt="imagelogo" />
                                    <p>ここにドラッグ＆ドロップしてね</p>
                                </div>
                                <input className="imageUploadInput" multiple name="imageURL" type='file'
                                    accept='.jpg, .png'
                                    onChange={OnFileUpLoadToFirebase}
                                />
                            </div>
                            <p>または</p>
                            <button>
                                ファイルを選択
                                <input className="imageUploadInput" type='file'
                                    accept='.jpg, .png'
                                    onChange={OnFileUpLoadToFirebase}
                                />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>

    )
}

export default ImageUploader
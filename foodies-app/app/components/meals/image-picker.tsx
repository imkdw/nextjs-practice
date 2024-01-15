"use client";

import { ChangeEvent, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

interface Props {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: Props) {
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handlePickClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.preview}>
        {pickedImage && <Image src={pickedImage.toString()} alt="Picked" fill />}
        {!pickedImage && <p>Please pick an image.</p>}
      </div>
      <div className={classes.controls}>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          className={classes.input}
          ref={imageInputRef}
          onChange={handleImageChange}
          multiple
        />
      </div>
      <button className={classes.button} type="button" onClick={handlePickClick}>
        Pick an Image
      </button>
    </div>
  );
}

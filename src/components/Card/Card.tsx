import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';

export type CardProps = {
  src?: string;
  title: React.ReactNode;
  category?: React.ReactNode;
  textButton?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({title, category, textButton, onButtonClick, onImageClick }) => {
  return (
    <Card style={{ width: '25rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" />
       */}
      <Image onClick={onImageClick} src="https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg" rounded />
      <Card.Body>
        <Card.Title>Категория: {category}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <Button onClick={onButtonClick} variant="primary">Добавить</Button>
      </Card.Body>
    </Card>
  );
};

export default OneCard;
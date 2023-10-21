import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export type CardProps = {
  id?: number,
  src?: string;
  title: React.ReactNode;
  category?: React.ReactNode;
  textButton?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, category, textButton, src, onButtonClick, onImageClick }) => {
  return (
    <Card>
      <Link to={`/subscription/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={onImageClick}
            src={src ? src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
            rounded
          />
        </div>
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='pt-3'>Категория: {category}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <div className='mt-auto'>
          <Button style={{ backgroundColor: '#3D348B', padding: '10px 20px', borderColor: "#000" }} onClick={onButtonClick} variant="primary">Добавить</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OneCard;
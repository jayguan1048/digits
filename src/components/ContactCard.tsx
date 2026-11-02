'use client';

// import { Stuff } from '@prisma/client';
// import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Contact } from '@/lib/validationSchemas';

function BasicExample({ contact }: { contact: Contact }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" style={{ width: '75px'} } src={contact.image} />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Body>
        <Card.Text>
          {contact.description} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;

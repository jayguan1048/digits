'use client';

// import { Stuff } from '@prisma/client';
// import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Contact } from '@prisma/client';
import Link from 'next/link';

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={contact.image} style={{ width: '75px' }} />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Body>
        <Card.Text>
          {contact.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link href={`edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
}

export default ContactCard;

'use client';

// import { Stuff } from '@prisma/client';
// import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Contact, Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem';

function ContactCardAdmin({ contact, notes }: { contact: Contact; notes: Note[] }) {
  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Img variant="top" src={contact.image} style={{ width: '75px' }} />
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {contact.description}
        </Card.Text>
        <p className='blockquote-footer'>{contact.owner}</p>
        <ListGroup variant="flush">
          {notes?.map((note) => <NoteItem key={note.id} note={note}/>)}
        </ListGroup>
      </Card.Body>
      <Card.Footer />
    </Card>
  );
}

export default ContactCardAdmin;

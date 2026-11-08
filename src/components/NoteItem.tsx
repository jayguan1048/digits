'use client';

// import { Stuff } from '@prisma/client';
// import Link from 'next/link';
// import Card from 'react-bootstrap/Card';
import { Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

function NoteItem({ note }: { note: Note }) {
  return (
    <ListGroup.Item>
      <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
      <p>{note.note}</p>
    </ListGroup.Item>
  );
}

export default NoteItem;

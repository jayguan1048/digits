import { Col, Container, Row } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
// import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  // const stuff = await prisma.stuff.findMany({
  //   where: {
  //     owner,
  //   },
  // });
  // console.log(stuff);
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });
  console.log(contacts);
  console.log(notes);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Contacts</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.firstName}>
                  <ContactCard key={contact.id}
                   contact={contact}
                   notes={notes.filter(note => (note.contactId === contact.id))}  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;

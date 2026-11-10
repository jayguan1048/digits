import { Col, Container, Row } from 'react-bootstrap';
import ContactCard from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const contacts = await prisma.contact.findMany({});
  const notes = await prisma.note.findMany({});
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts (Admin)</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.firstName}>
                  <ContactCard key={contact.id}
                          contact={contact}
                          notes={notes.filter(note => (note.contactId === contact.id))}/>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;

import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import Link from "next/link";
import EventItem from '@/components/EventItem'

export default function HomePage({ evt }) {
  console.log(evt);
  return (
    <Layout title='home' >
     <h1>Upcoming Events</h1>
      {evt.length === 0 && <h3>No events to show</h3>}

      {evt.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {evt.length > 0 && (
        <Link  className='btn-secondary' href='/events'>
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?populate=*&_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { evt: events.data},
    revalidate: 1,
  };
}

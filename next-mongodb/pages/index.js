import Head from 'next/head';
import connectDB from '../db/connect';
import Movie from '../models/Movie';
export default function Home({ movies }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {
          movies.map(movie => {
            return (
              <div key={movie._id}>
                <h1>{movie.title}</h1>
                <p>{movie.plot}</p>
              </div>
            )
          })
        }
      </main>
    </div>
  )
}
export const getServerSideProps = async () => {
  try {
    await connectDB();
    const res = await Movie.find({});
    const movies = res.map(item => {
      const movie = item.toObject(); //convert to object
      // console.log("movie",movie);
      movie._id = `${movie._id}`
      return movie;
    })
    return {
      props: {
        movies
      }
    }
  } catch (error) {
    console.log(error);
  }
}
import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/filters/JobFilter";
import Pagination from "@/components/Pagination";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import Image from "next/image";

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
}

const StateSkeleton = ({ image, title, message }: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-36">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />

      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
    </>

    <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>

    <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
      {message}
    </p>
  </div>
);

const FindJobs = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;

  const userLocation = await fetchLocation();
  const { city, countryCode } = userLocation;

  const jobs = await fetchJobs({
    query: query ?? `Software Engineer in ${city}`,
    country: location ?? countryCode,
  });

  const countries = await fetchCountries();
  const parsedPage = parseInt(page ?? 1);

  console.log("Jobs", jobs);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="light-border mt-11 mb-9 flex flex-col gap-9 border-b pb-9">
        {jobs?.jobs.length > 0 ? (
          jobs.jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <StateSkeleton
            image={{
              light: "/images/light-illustration.png",
              dark: "/images/dark-illustration.png",
              alt: "Empty state illustration",
            }}
            title="No Jobs Found"
            message="Oops! We couldn't find any jobs at the moment. Please try again later"
          />
        )}
      </section>

      {jobs?.jobs.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs.jobs.length > 10} />
      )}
    </>
  );
};

export default FindJobs;

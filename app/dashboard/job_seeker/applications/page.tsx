import { dummyApplications } from "./applications-data"
import { ApplicationsView } from "./applications-view"

const MyApplicationsPage = () => {
  // TODO: fetch the seeker's applications from the API instead of the dummy rows
  return <ApplicationsView applications={dummyApplications} />
}

export default MyApplicationsPage

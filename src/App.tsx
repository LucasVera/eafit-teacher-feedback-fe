// import { Amplify } from "aws-amplify"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { ClassContextProvider } from "./common/context/ClassContext"
// import awsExports from "./aws-exports"

// Amplify.configure(awsExports)

function App() {
  return (
    <div>
      <ClassContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ClassContextProvider>
    </div>
  )
}

export default App

import * as React from 'react'
import { Helmet } from 'react-helmet-async'

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children, doc }) => <React.Fragment>
    <Helmet>
        <link rel="icon"
              type="image/png"
              href="/public/favicon.png"
        />
    </Helmet>
    {children}
</React.Fragment>
export default Wrapper

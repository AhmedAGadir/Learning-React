// nextjs gives us a default error page 
// however we can create a one by including an _error.js file in the pages folder

import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const errorPage = props => (
	<div>
		<h1>Oops, something went wrong.</h1>
		<p>Try <Link href="/"><a>going back</a></Link>.</p>
	</div>
)

export default errorPage;
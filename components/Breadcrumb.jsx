import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const router = useRouter();

  // If custom breadcrumbs are provided, use them
  if (customBreadcrumbs) {
    return (
      <nav className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {customBreadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-500">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    );
  }

  // Auto-generate breadcrumbs from router path
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const breadcrumbs = [
    { href: "/", label: "Home" },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      return { href, label };
    }),
  ];

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-500">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;

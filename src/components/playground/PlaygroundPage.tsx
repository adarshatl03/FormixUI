import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ComponentPlayground } from "./ComponentPlayground";
import { COMPONENTS } from "./components-config";

const PlaygroundGallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Component Playground</h1>
        <p className="text-muted-foreground">
          Explore, test, and customize our core UI components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(COMPONENTS).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <Link
              key={key}
              to={`/playground/${key}`}
              className="group relative flex flex-col items-center justify-center p-8 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{config.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 px-4">
                  {config.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PlaygroundDetail = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();

  const ActiveConfig = componentId ? COMPONENTS[componentId] : null;

  if (!ActiveConfig) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-muted-foreground">Component not found</p>
        <button onClick={() => navigate("/playground")} className="text-primary hover:underline">
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/playground")}
          className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Back to Gallery"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-bold">{ActiveConfig.title}</h2>
          <p className="text-xs text-muted-foreground">Playground Mode</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ComponentPlayground
          key={componentId}
          component={ActiveConfig.component}
          defaultProps={ActiveConfig.defaultProps}
          propDefinitions={ActiveConfig.propDefinitions as any}
        />
      </div>
    </div>
  );
};

export const PlaygroundPage = () => {
  return (
    <Routes>
      <Route index element={<PlaygroundGallery />} />
      <Route path=":componentId" element={<PlaygroundDetail />} />
    </Routes>
  );
};

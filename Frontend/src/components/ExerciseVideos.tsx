import { Exercise } from "@/data/mockExercises";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play } from "lucide-react";

interface ExerciseVideosProps {
  exercises: Exercise[];
}

export const ExerciseVideos = ({ exercises }: ExerciseVideosProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">Recommended Exercises</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow these facial exercises and massage techniques to naturally improve your skin health
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
            <div className="relative aspect-video bg-muted">
              <iframe
                src={exercise.videoUrl}
                title={exercise.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl">{exercise.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                  <Clock className="h-4 w-4" />
                  <span>{exercise.duration}</span>
                </div>
              </div>
              <CardDescription className="text-base">
                {exercise.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <Play className="h-3 w-3" />
                  <span className="font-medium">For {exercise.targetIssue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {exercises.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No exercises available for the detected skin concerns.</p>
        </div>
      )}
    </div>
  );
};

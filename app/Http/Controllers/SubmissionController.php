<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Submission::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'assignment_id' => 'required|exists:assignments,id',
            'submitted_at' => 'nullable|date',
            'grade' => 'nullable|numeric|min:0|max:10',
        ]);
        $submission = Submission::create($request->all());
        return response()->json([
            'message' => 'Submission recorded successfully',
            'submission' => $submission
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $submission = Submission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'Submission not found'], 404);
        }
        return response()->json($submission, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $submission = Submission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'Submission not found'], 404);
        }
        $request->validate([
            'grade' => 'required|numeric|min:0|max:10',
        ]);
        $submission->update($request->only(['grade']));
        return response()->json([
            'message' => 'Grade updated successfully',
            'submission' => $submission
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $submission = Submission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        $submission->delete();
        return response()->json(['message' => 'Assignment deleted successfully'], 200);
    }
}

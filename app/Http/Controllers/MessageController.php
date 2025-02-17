<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $messages = Message::where('receiver_id', $userId)
            ->orWhere('sender_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($messages, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);
        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);
        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function conversation(Request $request, $userId)
    {
        $authId = $request->user()->id;
        $messages = Message::where(function ($query) use (
            $authId,
            $userId
        ) {
            $query->where('sender_id', $authId)
                ->where('receiver_id', $userId);
        })
            ->orWhere(function ($query) use ($authId, $userId) {
                $query->where('sender_id', $userId)
                    ->where('receiver_id', $authId);
            })
            ->orderBy('created_at', 'asc')
            ->get();
        return response()->json($messages, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function markAsRead($id)
    {
        $message = Message::find($id);
        if (!$message) {
            return response()->json(['message' => 'Message not found'],404);
        }
        $message->update(['is_read' => true]);
        return response()->json(['message' => 'Message marked as read'],200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $message = Message::find($id);
        if (!$message) {
            return response()->json(['message' => 'Message not found'],404);
        }
        $message->delete();
        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
}

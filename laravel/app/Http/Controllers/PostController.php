<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Hello World',
        ]);
    }
    public function store(Request $request)
    {
        $this->authorize('create', Post::class);

        $request->validate([
            'title' => 'required|string|max:50',
            'content' => 'required|string|max:255',
            'user_id' => 'required|string',
        ]);
        
        
        $post = Post::create([
            'id' => 'POST_' . $request->user_id_ .'_'. time(),
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => $request->user_id,
            
        ]);
        // return response()->json([
        //     'message' => $request->title,
        // ]);

        return response()->json(['post' => $post]);

    }
    public function show($id)
    {
        $post = Post::find($id);
        $this->authorize('findById', $post);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }

        return response()->json(['post' => $post]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:10',
            'content' => 'required|string|max:20',
            'user_id' => 'required|string',
        ]);

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }

        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = $request->user_id;
        $post->save();

        return response()->json(['post' => $post]);
    }
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted',
        ]);
    }
}

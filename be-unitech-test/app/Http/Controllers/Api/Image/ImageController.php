<?php

namespace App\Http\Controllers\Api\Image;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image as InterventionImage;

class ImageController extends Controller
{
    public function index()
    {
        $productImages = Image::when(request()->q, function ($productImages) {
            $productImages = $productImages->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return new ImageResource(true, 'List Data Product Images', $productImages);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'original'    => 'required|image|mimes:jpeg,jpg,png|max:3000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $original = $request->file("original");
        $original->storeAs('public/products/original/', $original->hashName());

        $resizeImg = InterventionImage::make(storage_path('app/public/products/original/' . $original->hashName()));
        $resizeImg->resize(300, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        $thumbnailImg = InterventionImage::make(storage_path('app/public/products/original/' . $original->hashName()));
        $thumbnailImg->resize(100, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        $resizeImg->save(storage_path('app/public/products/resize300/' . $original->hashName()));
        $thumbnailImg->save(storage_path('app/public/products/thumbnail/' . $original->hashName()));

        $productImage = Image::create([
            'name' => $request->name,
            'original' => "/storage/products/original/" . $original->hashName(),
            'resize300' => "/storage/products/resize300/" . $original->hashName(),
            'thumbnail' => "/storage/products/thumbnail/" . $original->hashName(),
        ]);

        if ($productImage) {
            return new ImageResource(true, 'Data Image Berhasil Disimpan!', $productImage);
        }

        return new ImageResource(false, 'Data Image Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $productImage = Image::whereId($id)->first();

        if ($productImage) {
            return new ImageResource(true, 'Detail Data Image!', $productImage);
        }

        return new ImageResource(false, 'Detail Data Image Tidak DItemukan!', null);
    }


    public function edit(Request $request, $id)
    {
        $productImage = Image::find($id);
        $filepath = ["original", "resize300", "thumbnail"];

        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'original'    => 'image|mimes:jpeg,jpg,png|max:3000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->file("original")) {
            Storage::disk('local')->delete('public/products/' . $filepath[0] . "/" . basename($productImage->original));
            Storage::disk('local')->delete('public/products/' . $filepath[1] . "/" . basename($productImage->original));
            Storage::disk('local')->delete('public/products/' . $filepath[2] . "/" . basename($productImage->original));

            $original = $request->file("original");
            $original->storeAs('public/products/original/', $original->hashName());

            $resizeImg = InterventionImage::make(storage_path('app/public/products/original/' . $original->hashName()));
            $resizeImg->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            });

            $thumbnailImg = InterventionImage::make(storage_path('app/public/products/original/' . $original->hashName()));
            $thumbnailImg->resize(100, null, function ($constraint) {
                $constraint->aspectRatio();
            });

            $resizeImg->save(storage_path('app/public/products/resize300/' . $original->hashName()));
            $thumbnailImg->save(storage_path('app/public/products/thumbnail/' . $original->hashName()));

            $productImage->update([
                'name' => $request->name,
                'original' => "/storage/products/original/" . $original->hashName(),
                'resize300' => "/storage/products/resize300/" . $original->hashName(),
                'thumbnail' => "/storage/products/thumbnail/" . $original->hashName(),
            ]);
        }

        $productImage->update([
            'name' => $request->name,
        ]);

        if ($productImage) {
            return new ImageResource(true, 'Data Image Berhasil Diupdate!', $productImage);
        }

        return new ImageResource(false, 'Data Image Gagal Diupdate!', null);
    }

    public function destroy($id)
    {
        $productImage = Image::find($id);

        $filepath = ["original", "resize300", "thumbnail"];

        Storage::disk('local')->delete('public/products/' . $filepath[0] . "/" . basename($productImage->original));
        Storage::disk('local')->delete('public/products/' . $filepath[1] . "/" . basename($productImage->resize300));
        Storage::disk('local')->delete('public/products/' . $filepath[2] . "/" . basename($productImage->thumbnail));

        if ($productImage->delete()) {
            return new ImageResource(true, 'Data Image Berhasil Dihapus!', null);
        }

        return new ImageResource(false, 'Data Image Gagal Dihapus!', null);
    }
}
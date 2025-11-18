#include <emscripten.h>
#include <math.h>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  void render(float time, unsigned char* buffer, int width, int height) {
    for(int y=0; y<height; y++) {
      for(int x=0; x<width; x++) {
        float u = (x - width*0.5f)/height;
        float v = (y - height*0.5f)/height;
        float d = sinf(sqrtf(u*u+v*v)*10.0f - time*5.0f);
        int idx = (y*width + x)*4;
        buffer[idx+0] = (int)(d*255);
        buffer[idx+1] = (int)(sinf(time)*100 + 155);
        buffer[idx+2] = 255;
        buffer[idx+3] = 255;
      }
    }
  }
}
